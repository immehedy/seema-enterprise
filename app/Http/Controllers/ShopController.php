<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use App\Product;
use App\Contact;
use App\Photo;

class ShopController extends Controller
{
    public function index(){
      $products = Product::where('premium', 'premium')->orderBy('created_at', 'DESC')->paginate(9);
      $photos = Photo::all();
      return view('index', compact('products', 'photos'));
    }
    public function singleproduct($id){
      $product = Product::findOrFail($id);
      $productid = Product::where('id', $id)->pluck('id')->toArray();
      $photos = Photo::whereIn('product_id', $productid)->get();
      return view('singleproduct', compact('product', 'photos'));
    }
    public function about(){
      return view('about');
    }
    public function contact(){
      return view('contact');
    }
    public function contactpost(Request $request){
      $this->validate($request, [
        'cname'=>'required|string',
        'email'=>'required|string',
        'message'=>'required',
      ]);
      $contact = new Contact;
      $contact->name=$request['name'];
      $contact->cname=$request['cname'];
      $contact->email=$request['email'];
      $contact->message=$request['message'];
      $contact->save();
      return back()->with('success', 'Your message has been succesfully sent');
    }
}
