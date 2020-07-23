<table class="table table-striped" id="myTable">
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
        <td class="text-nowrap"> <a href="{{route('newBill', $totalbill->employee->id)}}">{{$totalbill->employee->name}}</a> </td>
        <td>{{$totalbill->description}}</td>
        <td>{{$totalbill->amount}}</td>
        <td>{{ date_format($totalbill->created_at, 'd/m/Y') }}</td>
        <td>{{ date_format($totalbill->updated_at, 'd/m/Y') }}</td>
      </tr>
      @endforeach
    </tbody>
</table>
