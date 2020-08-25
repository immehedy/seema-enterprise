@extends('layouts/master')

@section('content')
<!-- Page Header -->
<header class="masthead" style="background-image: url('{{asset('/assets/img/home-cover.jpg')}}')">
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
              <div class="col-lg-8 col-md-10 mx-auto">
                <h2 style="text-align:center">Folding Machine</h2>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="row">
              @foreach($products as $product)
              <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                  <a href="{{route('singleProduct',$product->id)}}">
                    <div class="card-body">
                      @foreach($photos as $photo)
                        @if($photo->product_id == $product->id)
                          <img src="{{asset($photo->name)}}" width="300" height="200" alt="">
                          @break
                        @endif

                      @endforeach
                      <h3>{{$product->title}}</h3>
                      <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">{{$product->created_at->diffForHumans()}}</small>
                      </div>
                    </div>
                  </a>

                </div>
              </div>
              @endforeach
            </div>
          </div>
        </div>

        <div class="col-lg-8 col-md-8 mx-auto">
          {{ $products->links()}}
        </div>
      <!-- Pager -->
      <!-- <div class="clearfix">
        {{ $products->links()}}
      </div> -->

@stop
