@extends('layouts.admin')

@section('content')

<h1>Edit Employee</h1>

<div class="col-sm-9">

  {!! Form::model($employee, ['method' => 'PATCH', 'action' => ['AdminEmployeesController@update',$employee->id]]) !!}
  <div class="form-group">
    {!! Form::label('name', 'Name')!!}
    {!!Form::text('name', null, ['class'=>'form-control'])!!}

    {!! Form::label('phone', 'Phone')!!}
    {!!Form::text('phone', null, ['class'=>'form-control'])!!}

    {!! Form::label('address', 'Address')!!}
    {!!Form::text('address', null, ['class'=>'form-control'])!!}
  </div>
    <div class="form-group">
      {!! Form::submit('Edit Employee',['class'=>'btn btn-primary'])!!}

    </div>


  {!! Form::close() !!}


            {!! Form::open(['method'=>'DELETE', 'action'=>['AdminEmployeesController@destroy', $employee->id]])!!}

                <div class="">
                  {!! Form::submit('Delete Employee', ['class'=>'btn btn-danger']) !!}
                </div>

            {!! Form::close() !!}
</div>

@endsection
