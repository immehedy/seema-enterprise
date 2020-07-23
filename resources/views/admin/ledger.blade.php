@extends('layouts.admin')
@section('title') Bills @stop
@section('content')
<div class="content">
  <div class="card">
      <div class="card-header bg-light">
          Ledger
      </div>

      <div class="card-body">
        <input class="form-control" type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for dates" title="Type in a date">
          <div class="table-responsive">
            @include('table.allledgertable', $ledgers)
          </div>
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
    td = tr[i].getElementsByTagName("td")[0];
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
