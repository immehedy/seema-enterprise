@extends('layouts.admin')
@section('title') Dashboard @endsection

@section('content')
<div class="content">
    <div class="container-fluid">
        <!-- <div class="row">
            <div class="col-md-6">
                <div class="card p-4">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div>
                            <span class="h4 d-block font-weight-normal mb-2">{{$employees->count()}}</span>
                            <span class="font-weight-light">Employees</span>
                        </div>

                        <div class="h2 text-muted">
                            <i class="icon icon-user"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card p-4">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div>
                            <span class="h4 d-block font-weight-normal mb-2">{{$employeebills->count()}}</span>
                            <span class="font-weight-light">Bills</span>
                        </div>

                        <div class="h2 text-muted">
                            <i class="icon icon-paper-clip"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->

        <div class="row ">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        Todays Bill
                    </div>

                    <div class="card-body p-0">
                      <div class="col-md-12">
                          <div class="card">
                              <div class="card-header bg-light">
                                  Voucher of {!! date("d/m/Y") !!}
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
                              <form class="" action="{{route('dailyBill')}}" method="post">
                                @csrf
                                  <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-8">
                                            <div class="form-group">
                                                <label for="normal-input" class="form-control-label">Date</label>
                                                <input type="date" name="date">
                                            </div>
                                            </div>
                                            <div class="col-md-8">
                                                <div class="form-group">
                                                    <label for="placeholder-input" class="form-control-label">Particulars</label>
                                                    <input name="name" id="normal-input" class="form-control">
                                                </div>
                                            </div>

                                            <div class="col-md-8">
                                                <div class="form-group">
                                                    <label for="placeholder-input" class="form-control-label">Folio or Page</label>
                                                    <input name="bill_id" id="normal-input" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-md-8">
                                                <div class="form-group">
                                                    <label for="placeholder-input" class="form-control-label">Check no.</label>
                                                    <input name="check_id" id="normal-input" class="form-control">
                                                </div>
                                            </div>
                                        <div class="col-md-8">
                                            <div class="form-group">
                                                <label for="normal-input" class="form-control-label">Debit</label>
                                                <input name="debit" id="normal-input" class="form-control" placeholder="">
                                            </div>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="form-group">
                                                <label for="normal-input" class="form-control-label">Credit</label>
                                                <input name="credit" id="normal-input" class="form-control" placeholder="">
                                            </div>
                                        </div>
                                    </div>

                                    <button class="btn btn-success" type="submit" name="dailyledger">Enter</button>
                                </div>
                              </form>

                          </div>
                      </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        Daily chart of bills
                    </div>

                    <div class="card-body p-0">
                      {!! $chart->container() !!}
                    </div>
                </div>
            </div>
        </div>
        <div class="row ">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        Todays Bill
                    </div>

                    <div class="card-body">
                        <div class="table-responsive">
                            @include('table.ledgertable', $dailyledgers)
                        </div>
                        <a href="{{route('adminLedgerExport_view')}}" class="btn btn-primary">Download</a>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
{!! $chart->script() !!}
@endsection
