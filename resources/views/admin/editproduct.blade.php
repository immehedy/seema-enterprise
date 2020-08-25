@extends('layouts.admin')
@section('title')
Edit Product
@endsection
@section('content')
<div class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header bg-light">
                        Edit Product
                    </div>
                    @if(Session::has('success'))
                      <div class="alert alert-success">{{Session::get('success')}}</div>
                    @endif
                    @if($errors->any())
                      <div class="alert alert-danger">
                        <ul>
                          @foreach($errors->all() as $error)
                            <li>{{$error}}</li>
                          @endforeach
                        </ul>
                      </div>
                    @endif
                    <form class="" action="{{route('adminEditProductPost', $product->id)}}" method="post" enctype="multipart/form-data">
                      @csrf
                        <div class="card-body">
                          <div class="row">
                            <div class="col-md-8">
                                <div class="form-group">
                                    <label for="normal-input" class="form-control-label">Thumbnail</label>
                                    <input type="file" name="thumbnail[]" class="form-control" multiple >
                                </div>
                                <img src="{{ asset($product->thumbnail)}}" width="100" alt="">
                            </div>

                          </div>
                          <div class="row">
                            <div class="col-md-8">
                                <div class="form-group">
                                    <label for="normal-input" class="form-control-label">Title</label>
                                    <input name="title" value="{{$product->title}}" class="form-control" >
                                </div>
                            </div>

                          </div>
                          <div class="row">
                            <div class="col-md-8">
                              <div class="form-group">
                                <label for="exampleFormControlSelect1">Choose a category</label>
                                <select name="category" class="form-control" id="exampleFormControlSelect1" value="{{$product->category}}" >
                                  <option>one color</option>
                                  <option>two color</option>
                                  <option>four color</option>
                                  <option>book binding</option>
                                  <option>foil machine</option>
                                  <option>die cutting machine</option>
                                  <option>lamination machine</option>
                                  <option>sewing machine</option>
                                  <option>folding machine</option>
                                  <option>guillotine</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="row mt-4">
                              <div class="col-md-8">
                                  <div class="form-group">
                                      <label for="placeholder-input" class="form-control-label">Description</label>
                                      <textarea class="form-control"  name="description" rows="8" cols="30">{{$product->description}}</textarea>
                                  </div>
                              </div>
                          </div>
                          <div class="row">
                            <div class="col-md-8">
                                <div class="form-group">
                                  <input type="checkbox" id="premium" name="premium" value="premium">
                                  <label for="premium">Premium</label>
                                </div>
                            </div>
                          </div>

                          <button class="btn btn-success" type="submit" name="createproduct">Update</button>
                      </div>
                    </form>

                </div>
            </div>
        </div>


    </div>
</div>
@stop
