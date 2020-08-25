@extends('layouts/master')
@section('title') {{$product->title}}@stop
@section('content')
<!-- Page Header -->
@foreach($photos as $photo)
<header class="masthead" style="background-image: url('{{asset($photo->name)}}')">
  @break
  @endforeach
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
      @foreach($photos as $photo)
        <a target="_blank" href="{{asset($photo->name)}}">
        <img src="{{asset($photo->name)}}" width="500" alt="">
        </a>
        <hr>
      @endforeach

    </div>
    <div class="col-md-6">
      <h2>{{$product->title}}</h2>
      <hr>
      <h3>Description:</h3>
      <p>{!! nl2br($product->description) !!}</p>
      <hr>
      <h1>Want to know more? send us your query:</h1>
      @if(Session::has('success'))
        <div class="alert alert-success">{{Session::get('success')}}</div>
      @endif
      <form name="sentMessage" action="{{route('contactpost')}}" method="post" id="contactForm">
        @csrf
        <div class="control-group">
          <div class="form-group col-xs-12 floating-label-form-group controls">
            <label>Company/Name</label>
            <input name="cname" type="tel" class="form-control" placeholder="Company/Name" id="cname">
            <p class="help-block text-danger"></p>
          </div>
        </div>
        <div class="control-group">
          <div class="form-group floating-label-form-group controls">
            <label>Email Address</label>
            <input name="email" type="email" class="form-control" placeholder="Email Address" id="email" >
            <p class="help-block text-danger"></p>
          </div>
        </div>
        <div class="control-group">
          <div class="form-group floating-label-form-group controls">
            <label>Message</label>
            <textarea name="message" rows="5" class="form-control" placeholder="Message" id="message"></textarea>
            <p class="help-block text-danger"></p>
          </div>
        </div>
        <br>
        <div id="success"></div>
        <button type="submit" class="btn btn-primary" id="sendMessageButton">Send</button>
      </form>
    </div>
  </div>
</div>

@stop
