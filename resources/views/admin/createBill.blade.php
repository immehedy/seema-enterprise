@extends('layouts.admin')
@section('title') New Bill @stop
@section('content')
<div class="content">
    <div class="container-fluid">
        <div class="row">
          <div class="col-md-6">
              <div class="card">
                  <div class="card-header bg-light">
                      New Bill
                  </div>
                    @if(Session::has('successcreate'))
                      <div class="alert alert-success">{{Session::get('successcreate')}}</div>
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
                  <form class="" action="{{route('createBill')}}" method="post">
                    @csrf
                      <div class="card-body">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="form-group">
                                    <label for="normal-input" class="form-control-label">Employee name</label>
                                    <input name="employee_name" id="normal-input" class="form-control"value="{{$employee->name}}">
                                    <input type="hidden" name="employee_id" value="{{$employee->id}}">
                                </div>
                            </div>
                                <div class="col-md-8">
                                    <div class="form-group">
                                        <label for="placeholder-input" class="form-control-label">Details</label>
                                        <textarea class="form-control" name="description" id="" rows="8" cols="30" ></textarea>
                                    </div>
                                </div>
                            <div class="col-md-8">
                                <div class="form-group">
                                    <label for="normal-input" class="form-control-label">Amount</label>
                                    <input name="amount" id="normal-input" class="form-control" placeholder="">
                                </div>
                            </div>
                        </div>

                        <button class="btn btn-success" type="submit" name="newbill">New bill</button>
                    </div>
                  </form>

              </div>
          </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header bg-light">
                        Voucher
                    </div>
                      @if(Session::has('successpay'))
                        <div class="alert alert-success">{{Session::get('successpay')}}</div>
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
                    <form class="" action="{{route('payBill')}}" method="post">
                      @csrf
                        <div class="card-body">
                          <div class="row">
                              <div class="col-md-8">
                                  <div class="form-group">
                                      <label for="normal-input" class="form-control-label">Employee name</label>
                                      <input name="employee_name" id="normal-input" class="form-control"value="{{$employee->name}}">
                                      <input type="hidden" name="employee_id" value="{{$employee->id}}">
                                  </div>
                              </div>
                                  <div class="col-md-8">
                                      <div class="form-group">
                                          <label for="placeholder-input" class="form-control-label">Bill no.</label>
                                          <input name="bill_id" id="normal-input" class="form-control">
                                      </div>
                                  </div>
                              <div class="col-md-8">
                                  <div class="form-group">
                                      <label for="normal-input" class="form-control-label">Amount</label>
                                      <input name="amount" id="normal-input" class="form-control" placeholder="">
                                  </div>
                              </div>
                          </div>

                          <button class="btn btn-success" type="submit" name="paybill">Pay</button>
                      </div>
                    </form>

                </div>
            </div>
        </div>
        <div class="row">
          <div class="col-md-12">
              <div class="card">
                  <div class="card-header bg-light">
                      {{$employee->name}} Bills
                  </div>

                  <div class="card-body">
                      <div class="table-responsive">
                          <table class="table table-striped">
                              <thead>
                              <tr>
                                  <th>Bill no.</th>
                                  <th>Employee Name</th>
                                  <th>Details</th>
                                  <th>Amount</th>
                                  <th>Created at</th>
                                  <th>Updated at</th>
                              </tr>
                              </thead>
                              <tbody>
                                @foreach($employeebills as $employeebill)
                                  <tr>
                                    <td>{{$employeebill->id}}</td>
                                    <td>{{$employeebill->employee->name}}</td>
                                    <td>{{$employeebill->description}}</td>
                                    <td>{{$employeebill->amount}}</td>
                                    <td>{{ date_format($employeebill->created_at, 'd/m/Y') }}</td>
                                    <td>{{ date_format($employeebill->updated_at, 'd/m/Y') }}</td>
                                  </tr>
                                @endforeach
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>
        </div>

    </div>
</div>
@stop
