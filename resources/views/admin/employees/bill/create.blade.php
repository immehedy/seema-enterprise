@extends('layouts.admin')

@section('content')

<h1>Add Employee Bill</h1>

<div class="col-sm-6">

  {!! Form::open(['method' => 'POST', 'action' => 'AdminEmployeeBillsController@store']) !!}
  <input type="hidden" name="employee_id" value="{{employee->id}}">
  <div class="form-group">
    {!! Form::label('descrition', 'Details')!!}
    {!!Form::text('descrition', null, ['class'=>'form-control'])!!}

    {!! Form::label('debit', 'Debit')!!}
    {!!Form::text('debit', null, ['class'=>'form-control'])!!}

    {!! Form::label('credit', 'Credit')!!}
    {!!Form::text('credit', null, ['class'=>'form-control'])!!}
  </div>
    <div class="form-group">
      {!! Form::submit('create Bill',['class'=>'btn btn-primary'])!!}
    </div>

  {!! Form::close() !!}


</div>

@endsection
