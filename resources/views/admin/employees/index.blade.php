@extends('layouts.admin')

@section('content')
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Created At</th>
        </tr>
      </thead>
      @if($employees)
       @foreach($employees as $employee)
      <tbody>
        <tr>
          <td>{{$employee->id}}</td>
          <td> <a href="{{route('bills.create', $employee->id)}}"> {{$employee->name}} </a></td>
          <td>{{$employee->address}}</td>
          <td>{{$employee->phone}}</td>
          <td>{{$employee->created_at}}</td>
        </tr>
      </tbody>
      @endforeach
      @else
      <h1>there is no employee</h1>
      @endif

    </table>
@stop
