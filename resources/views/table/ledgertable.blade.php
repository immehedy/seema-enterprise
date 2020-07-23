<table class="table table-striped" id="myTable">
    <thead>
    <tr>
        <th>Date</th>
        <th>Name</th>
        <th>Bill no.</th>
        <th>Check no.</th>
        <th>Debit</th>
        <th>Credit</th>
        <th>Balance</th>

    </tr>
    </thead>
    <tbody>
      @foreach($dailyledgers as $ledger)
      <tr>
        <td>{{ date_format($ledger->created_at, 'd/m/Y') }}</td>
        <td>{{$ledger->name}}</td>
        <td>{{$ledger->bill_id}}</td>
        <td>{{$ledger->check_id}}</td>
        <td>{{$ledger->debit}}</td>
        <td>{{$ledger->credit}}</td>
        <td>{{$ledger->balance}}</td>
      </tr>
      @endforeach
    </tbody>
    <tfoot>
      <tr>
        <th>Total</th>
        <th></th>
        <th></th>
        <th>{{$dailyledgers->sum('debit')}}</th>
        <th>{{$dailyledgers->sum('credit')}}</th>
        <th></th>
        <th>{{$dailyledgers->sum('balance')}}</th>
      </tr>
    </tfoot>
</table>
