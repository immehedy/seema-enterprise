@extends('layouts/master')

@section('content')
<!-- Page Header -->
<header class="masthead" style="background-image: url('{{asset('/assets/img/about.jpg')}}')">
  <div class="overlay"></div>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-10 mx-auto">
        <div class="site-heading">
          <h1>About</h1>
          <span class="subheading">Seema Enterprise</span>
        </div>
      </div>
    </div>
  </div>
</header>

<div class="container">
  <div class="row">
    <div class="col-lg-8 col-md-10 mx-auto">
      <p>
        Seema Enterprise is a well-known name in the era of used offset printing machine business.
        We are doing this business since 1992 and still one of the biggest used offset printing machines importer and local supplier.
        We import machines from around the world. Our most of the machines came from Japan and Europe that's why our machines quality is very good.
        <br>
        <hr>
        We provide excellent condition machines with superior quality to our customer at affordable price.
        We can supply you every kinds of used offset printing machines that you are looking for and also others related machines like cutting, die-cutting machines.
        If we have not any machines in our stock that you are looking for, we can supply you in one month. So why you should go to another supplier for machines.
        <br> <hr>
        Our aim is to provide quality machines at affordable price.
        We believe in customer satisfaction, so you can rely on our machines.
        We also provide 6 months service warranty to our valued customer so that they could understand the machine condition.
        Every week we buy couple of container machines. We have four showrooms in different places.
        You will find at least 50 machines in our stock always. You are always welcome in our premises.
        <hr>

        I hope we will do good business together and make a good business relationship which will last for forever.
        I am eagerly looking forward to your valued order. Please find out your time to visit us anytime on business hour.
      </p>
    </div>
  </div>
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
