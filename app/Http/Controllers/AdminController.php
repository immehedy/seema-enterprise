<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use App\Employee;
use App\EmployeeBill;
use App\Ledger;
use App\Product;
use App\Contact;
use App\Photo;
use App\Charts\DashboardChart;

use App\Exports\LedgerExport;
use App\Exports\LedgerExportView;
use Maatwebsite\Excel\Facades\Excel;

class AdminController extends Controller
{
    //
    public function dashboard(){
      $employees = Employee::all();
      $employeebills = EmployeeBill::all();


      $date = date("Y/m/d");
      $ledgers = Ledger::whereDate('date', $date)->pluck('id')->toArray();
      $dailyledgers = Ledger::whereIn('id', $ledgers)->get();

      $chart = new DashboardChart;
      $days = $this->generateDateRange(Carbon::now()->subDays(30), Carbon::now());
      $bills = [];
      foreach($days as $day){
        $bills[]= Ledger::whereDate('created_at', $day)->count();
      }
      $chart->dataset('Ledger', 'line', $bills);
      $chart->labels($days);


      return view('admin.dashboard', compact('employees','employeebills','dailyledgers','chart'));
    }



    private function generateDateRange(Carbon $start_date, Carbon $end_date){
      $dates = [];
      for($date = $start_date; $date->lte($end_date); $date->addDay()){
        $dates[] = $date->format('Y-m-d');
      }
      return $dates;
    }
    public function employees(){
      $employees = Employee::all();
      return view('admin.employees', compact('employees'));
    }
    public function newEmployee(){
      return view('admin.createEmployee');
    }
    public function createEmployee(Request $request){
      $employee = new Employee();
      $employee->name = $request['name'];
      $employee->phone = $request['phone'];
      $employee->address = $request['address'];
      $employee->save();
      return back()->with('success', 'New employee created succesfully.');
    }
    public function totalbills(){
      $totalbills = EmployeeBill::all();
      return view('admin.totalBill', compact('totalbills'));
    }
    public function newBill($id){
      $employee = Employee::where('id',$id)->first();
      $employeeb = Employee::where('id',$id)->pluck('id')->toArray();
      $employeebills = EmployeeBill::whereIn('employee_id', $employeeb)->get();
      return view('admin.createBill', compact('employee','employeebills'));
    }
    public function createBill(Request $request){
      $employeebill = new EmployeeBill();
      $employeebill->employee_id = $request['employee_id'];
      $employeebill->description = $request['description'];
      $employeebill->amount = $request['amount'];
      $employeebill->save();
      return back()->with('successcreate', 'New bill is created succesfully.');
    }
    public function payBill(Request $request){
      $billid = $request['bill_id'];
      $employeebill = EmployeeBill::where('id',$billid)->first();
      $amount = $employeebill->amount - $request['amount'];
      ($amount<=0 ? $employeebill->amount = 0 :$employeebill->amount = $amount);
      $employeebill->save();
      return back()->with('successpay', 'Bill is succesfully paid');
    }
    public function dailyBill(Request $request){
      $ledger = new Ledger();
      $ledger->date = $request['date'];
      $ledger->name = $request['name'];
      $ledger->bill_id = $request['bill_id'];
      $ledger->check_id = $request['check_id'];
      $ledger->debit = $request['debit'];
      $ledger->credit = $request['credit'];
      $ledger->balance = $request['debit'] - $request['credit'];
      $ledger->save();
      return back()->with('success', 'Ledger updated');
    }
    public function ledger(){
      $ledgers = Ledger::all();
      return view('admin.ledger', compact('ledgers'));
    }


    public function export(){
      return Excel::download(new LedgerExport(), 'file.xlsx');
    }
    public function ledger_export_view(){
      $date = date("Y-m-d H:i:s");
      return Excel::download(new LedgerExportView(), $date.'lendger.xlsx');
    }
    public function bill_export_view(){
      $date = date("Y-m-d H:i:s");
      return Excel::download(new LedgerExportView(), $date.' bill.xlsx');
    }

    public function products(){
      $products = Product::all();
      $photos = Photo::all();
      return view('admin.products', compact('products', 'photos'));
    }
    public function newproducts(){
      return view('admin.newproducts');
    }
    public function newproductspost(Request $request){
      $this->validate($request, [
        'title'=>'required|string',
        'description'=>'required',
        'category'=>'required',
      ]);
      $product = new Product;
      $product->title=$request['title'];
      $product->description=$request['description'];
      $product->category=$request['category'];
      $product->premium=$request['premium'];
      $product->save();
      if($request->hasfile('thumbnail')){
        foreach($request->thumbnail as $file){
          $filename=$file->getClientOriginalName();
          $file->move($product->title, $filename);
          $photo = new Photo;
          $photo->name=$product->title.'/'.$filename;
          $photo->product_id=$product->id;
          $photo->save();
        }
      }
      return back()->with('success', 'Product is created succesfully');
    }
    public function editproduct($id){
      $product = Product::findOrFail($id);
      return view('admin.editproduct', compact('product'));
    }
    public function editproductpost(Request $request, $id){
      $this->validate($request, [
        'title'=>'required|string',
        'description'=>'required',
        'category'=>'required',
      ]);
      $product = Product::findOrFail($id);
      $product->title=$request['title'];
      $product->description=$request['description'];
      $product->category=$request['category'];
      $product->premium=$request['premium'];

      if($request->hasfile('thumbnail')){
        foreach($request->thumbnail as $file){
          $filename=$file->getClientOriginalName();
          $file->move($product->title, $filename);
          $photo = new Photo;
          $photo->name=$product->title.'/'.$filename;
          $photo->product_id=$product->id;
          $photo->save();
        }
      }

      $product->save();
      return back()->with('success', 'Product is updated succesfully');
    }
    public function deleteProduct($id){
      $product = Product::findOrFail($id);
      $photos = Photo::where('product_id', $id);
      if($product->thumbnail){
        unlink($product->thumbnail);
      }
      // foreach($photos as $photo){
      //   unlink($product->photos->name);
      // }
      $photos->delete();
      $product->delete();
      return back();
    }
    public function contacts(){
      $contacts = Contact::all();
      return view('admin.contact', compact('contacts'));
    }
    public function contactDelete(Request $request, $id){
      $contact = Contact::findOrFail($id)->delete();
      return back();
    }

}
