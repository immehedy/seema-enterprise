@extends('layouts.admin')
@section('content')
<div class="content">
  <div class="card">
      <div class="card-header bg-light">
          Employees
      </div>

      <div class="card-body">
          <div class="table-responsive">
              <table class="table table-striped">
                  <thead>
                  <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Created at</th>
                      <th>Updated at</th>
                  </tr>
                  </thead>
                  <tbody>
                    @foreach($employees as $employee)
                    <tr>
                      <td>{{$employee->id}}</td>
                      <td class="text-nowrap"> <a href="{{route('newBill', $employee->id)}}">{{$employee->name}}</a> </td>
                      <td>{{$employee->phone}}</td>
                      <td>{{$employee->address}}</td>
                      <td>{{ date_format($employee->created_at, 'd/m/Y') }}</td>
                      <td>{{ date_format($employee->updated_at, 'd/m/Y') }}</td>
                    </tr>
                    @endforeach
                  </tbody>
              </table>
          </div>
      </div>
  </div>
</div>

@stop
