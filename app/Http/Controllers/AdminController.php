<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Employee;
use App\EmployeeBill;
use App\Ledger;
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
      $ledger->date = $request['todaysdate'];
      $ledger->name = $request['name'];
      $ledger->bill_id = $request['bill_id'];
      $ledger->check_id = $request['check_id'];
      $ledger->debit = $request['debit'];
      $ledger->credit = $request['credit'];
      $ledger->balance = $request['credit'] - $request['debit'];
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

}
