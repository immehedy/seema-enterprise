@extends('layouts.master')

@section('content')

  <!-- Page Header -->
  <header class="masthead" style="background-image: url('{{asset('/assets/img/contact-bg.jpg')}}')">
    <div class="overlay"></div>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div class="page-heading">
            <h1>Contact Me</h1>
            <span class="subheading">Have questions? I have answers.</span>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-10 mx-auto">
        <p>
            <b>Office</b> <br>
            23/3H, Distrilary Road, Gandaria, Dhaka-1204. Bangladesh.<br>

            <b>Showroom #1</b> <br>
            Dogair Firm ar mor, Borobhanga-Dogair-Konapara, Dhaka <br>

            <b>Showroom #2</b> <br>
            Nimaikashari, Chittagong Road. <br>

            <b>Showroom #3</b> <br>
            23/3H, Distrilary Road, Gandaria, Dhaka-1204. Bangladesh. <br>
            <hr>

            <b>Office Hours </b><br>

            Saturday - Thursday: 9:00 am - 9:00 pm <br>
            Friday: 9:00 am - 3:00 pm <br>
          </p>
          <hr>
          <p>
            <b>Contact Info :</b>  <br>

            Phone     : +88027452284
            Cell         : +8801611199201, +8801611199203
            <br>
            Email       : seema_enterprise@hotmail.com <br>
            FB Page  : <a href="https://www.facebook.com/seemaenterprise.bd"> www.facebook.com/seemaenterprise.bd</a></p>
        <p> <b>Want to get in touch? Fill out the form below to send me a message and I will get back to you as soon as possible!</b> </p>
        <!-- Contact Form - Enter your email address on line 19 of the mail/contact_me.php file to make this form work. -->
        <!-- WARNING: Some web hosts do not allow emails to be sent through forms to common mail hosts like Gmail or Yahoo. It's recommended that you use a private domain email address! -->
        <!-- To use the contact form, your site must be on a live web host with PHP! The form will not work locally! -->
        @if(Session::has('success'))
          <div class="alert alert-success">{{Session::get('success')}}</div>
        @endif
        <form name="sentMessage" action="{{route('contactpost')}}" method="post" id="contactForm">
          @csrf
          <div class="control-group">
            <div class="form-group floating-label-form-group controls">
              <label>Name</label>
              <input name="name" type="text" class="form-control" placeholder="Name" id="name">
              <p class="help-block text-danger"></p>
            </div>
          </div>
          <div class="control-group">
            <div class="form-group col-xs-12 floating-label-form-group controls">
              <label>Company Name</label>
              <input name="cname" type="tel" class="form-control" placeholder="Company Name" id="cname">
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

  <hr>

  @stop
