<table class="table table-striped">
            <thead>
            <tr>
                <th>Bill no.</th>
                <th>Employee Name</th>
                <th>Details</th>
                <th>Amount</th>
                <th>Created at</th>
                <th>Updated at</th>
            </tr>
            </thead>
            <tbody>
              @foreach($employeebills as $employeebill)
                <tr>
                  <td>{{$employeebill->id}}</td>
                  <td>{{$employeebill->employee->name}}</td>
                  <td>{{$employeebill->description}}</td>
                  <td>{{$employeebill->amount}}</td>
                  <td>{{ date_format($employeebill->created_at, 'd/m/Y') }}</td>
                  <td>{{ date_format($employeebill->updated_at, 'd/m/Y') }}</td>
                </tr>
              @endforeach
            </tbody>
</table>
