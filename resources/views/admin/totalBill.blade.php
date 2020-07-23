@extends('layouts.admin')
@section('title') Bills @stop
@section('content')
<div class="content">
  <div class="card">
      <div class="card-header bg-light">
          Employees Bills
      </div>

      <div class="card-body">
        <input class="form-control" type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for names" title="Type in a name">
          <div class="table-responsive">
              @include('table.totalbilltable', $totalbills)
          </div>
          <a href="{{route('adminBillExport_view')}}" class="btn btn-primary">Download</a>
      </div>
  </div>
</div>
<script>
function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
</script>
@stop
