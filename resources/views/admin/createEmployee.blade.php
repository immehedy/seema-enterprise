@extends('layouts.admin')
@section('title') New Employee @stop
@section('content')
<div class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-10">
                <div class="card">
                    <div class="card-header bg-light">
                        New Employee
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
                    <form class="" action="{{route('createEmployee')}}" method="post">
                      @csrf
                        <div class="card-body">
                          <div class="row">
                              <div class="col-md-8">
                                  <div class="form-group">
                                      <label for="normal-input" class="form-control-label">Name</label>
                                      <input name="name" id="normal-input" class="form-control" placeholder="Name">
                                  </div>
                              </div>
                              <div class="col-md-8">
                                  <div class="form-group">
                                      <label for="normal-input" class="form-control-label">Phone</label>
                                      <input name="phone" id="normal-input" class="form-control" placeholder="Phone">
                                  </div>
                              </div>
                              <div class="col-md-8">
                                  <div class="form-group">
                                      <label for="normal-input" class="form-control-label">Address</label>
                                      <input name="address" id="normal-input" class="form-control" placeholder="address">
                                  </div>
                              </div>
                          </div>

                          <button class="btn btn-success" type="submit" name="createpost">Create Employee</button>
                      </div>
                    </form>

                </div>
            </div>
        </div>


    </div>
</div>
@stop
