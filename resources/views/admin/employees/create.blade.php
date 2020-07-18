@extends('layouts.admin')

@section('content')

<h1>Add Employee</h1>

<div class="col-sm-9">

  {!! Form::open(['method' => 'POST', 'action' => 'AdminEmployeesController@store']) !!}
  <div class="form-group">
    {!! Form::label('name', 'Name')!!}
    {!!Form::text('name', null, ['class'=>'form-control'])!!}

    {!! Form::label('phone', 'Phone')!!}
    {!!Form::text('phone', null, ['class'=>'form-control'])!!}

    {!! Form::label('address', 'Address')!!}
    {!!Form::text('address', null, ['class'=>'form-control'])!!}
  </div>
    <div class="form-group">
      {!! Form::submit('create Employee',['class'=>'btn btn-primary'])!!}
    </div>

  {!! Form::close() !!}


</div>

@endsection
