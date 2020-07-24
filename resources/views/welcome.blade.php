@extends('layouts/master')

@section('content')
<!-- Page Header -->
<header class="masthead" style="background-image: url('{{asset('/assets/img/home-bg.jpg')}}')">
  <div class="overlay"></div>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-10 mx-auto">
        <div class="site-heading">
          <h1>Seema Enterprise</h1>
          <span class="subheading">A Reliable source for printing machineries</span>
        </div>
      </div>
    </div>
  </div>
</header>

<!-- Main Content -->
<div class="album py-5 bg-light">
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="card mb-4 shadow-sm">
          <div class="card-body">
            <img src="{{asset('/assets/img/home-bg.jpg')}}" width="300" alt="">
            <p class="card-text">this is a machine</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                <button type="button" class="btn btn-sm btn-outline-secondary">Available</button>
              </div>
              <small class="text-muted">9 mins</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

@endsection
