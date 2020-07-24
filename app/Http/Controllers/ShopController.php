<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;

class ShopController extends Controller
{
    public function index(){
      $products = Product::paginate(9);
      return view('shop.index', compact('products'));
    }
    public function singleproduct($id){
      $product = Product::findOrFail($id);
      return view('shop.singleproduct', compact('product'));
    }
    public function about(){
      return view('about');
    }
    public function contact(){
      return view('contact');
    }
}
