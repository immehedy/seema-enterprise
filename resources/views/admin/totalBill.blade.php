@extends('layouts.admin')
@section('content')
<div class="content">
  <div class="card">
      <div class="card-header bg-light">
          Employees Bills
      </div>

      <div class="card-body">
          <div class="table-responsive">
              <table class="table table-striped">
                  <thead>
                  <tr>
                      <th>ID</th>
                      <th>Employee Name</th>
                      <th>Details</th>
                      <th>Amount</th>
                      <th>Created at</th>
                      <th>Updated at</th>
                  </tr>
                  </thead>
                  <tbody>
                    @foreach($totalbills as $totalbill)
                    <tr>
                      <td>{{$totalbill->id}}</td>
                      <td class="text-nowrap"> <a href="#">{{$totalbill->employee->name}}</a> </td>
                      <td>{{$totalbill->description}}</td>
                      <td>{{$totalbill->amount}}</td>
                      <td>{{ date_format($totalbill->created_at, 'd/m/Y') }}</td>
                      <td>{{ date_format($totalbill->updated_at, 'd/m/Y') }}</td>
                    </tr>
                    @endforeach
                  </tbody>
              </table>
          </div>
      </div>
  </div>
</div>

@stop
