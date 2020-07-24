@extends('layouts/master')
@section('title') {{$product->title}}@stop
@section('content')
<!-- Page Header -->
<header class="masthead" style="background-image: url('{{asset('/assets/img/single-cover.jpg')}}')">
  <div class="overlay"></div>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-10 mx-auto">
        <div class="site-heading">
          <h1>{{$product->title}}</h1>
          <span class="subheading"></span>
        </div>
      </div>
    </div>
  </div>
</header>

<div class="container">
  <div class="row">
    <div class="col-md-6">
      <img src="{{asset($product->thumbnail)}}" width="500" alt="">
    </div>
    <div class="col-md-6">
      <h2>{{$product->title}}</h2>
      <hr>
      {{$product->description}}
      <hr>
      <b>{{$product->price}} BDT</b>
      <br><br>
      <a href="#" class="btn btn-primary"> <i class="icon icon-basket-loaded"></i>Buy</a>
    </div>
  </div>
</div>

@stop
