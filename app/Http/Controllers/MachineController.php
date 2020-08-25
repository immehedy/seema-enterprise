<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use App\Photo;

class MachineController extends Controller
{
  public function onecolor(){
    $products = Product::where('category', 'one color')->paginate(5);
    $photos = Photo::all();
    return view('offsetprintingmachine.oneColor', compact('products', 'photos'));
  }
  public function twocolor(){
    $products = Product::where('category', 'two color')->paginate(5);
    $photos = Photo::all();
    return view('offsetprintingmachine.twoColor', compact('products', 'photos'));
  }
  public function fourcolor(){
    $products = Product::where('category', 'four color')->paginate(5);
    $photos = Photo::all();
    return view('offsetprintingmachine.fourColor', compact('products', 'photos'));
  }


  public function bookbinding(){
    $products = Product::where('category', 'book binding')->paginate(5);
    $photos = Photo::all();
    return view('postpress.bookBinding', compact('products', 'photos'));
  }
  public function foldingmachine(){
    $products = Product::where('category', 'folding machine')->paginate(5);
    $photos = Photo::all();
    return view('postpress.foldingMachine', compact('products', 'photos'));
  }
  public function diecuttingmachine(){
    $products = Product::where('category', 'die cutting machine')->paginate(5);
    $photos = Photo::all();
    return view('postpress.dieCuttingMachine', compact('products', 'photos'));
  }
  public function lamination(){
    $products = Product::where('category', 'lamination machine')->paginate(5);
    $photos = Photo::all();
    return view('postpress.laminationMachine', compact('products', 'photos'));
  }
  public function sewingmachine(){
    $products = Product::where('category', 'sewing machine')->paginate(5);
    $photos = Photo::all();
    return view('postpress.sewingMachine', compact('products', 'photos'));
  }
  public function foilmachine(){
    $products = Product::where('category', 'foil machine')->paginate(5);
    $photos = Photo::all();
    return view('postpress.foilmachine', compact('products', 'photos'));
  }
  public function guillotine(){
    $products = Product::where('category', 'guillotine')->paginate(5);
    $photos = Photo::all();
    return view('guillotine', compact('products', 'photos'));
  }
}
