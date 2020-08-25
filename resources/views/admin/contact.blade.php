@extends('layouts.admin')

@section('title') Admin Contacts @stop
@section('content')
  <div class="content">
    <div class="card">
        <div class="card-header bg-light">
            Admin Contacts
        </div>

        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Company Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Created at</th>

                    </tr>
                    </thead>
                    <tbody>
                      @foreach($contacts as $contact)
                    <tr>
                        <td>{{$contact->id}}</td>
                        <td>{{$contact->name}}</td>
                        <td>{{$contact->cname}}</td>
                        <td>{{$contact->email}}</td>
                        <td>{{$contact->message}}</td>
                        <td>{{$contact->created_at->diffForHumans()}}</td>
                        <td><a href="https://gmail.com/" target="_blank" class="btn btn-dark"> <i class="fa fa-reply"></i> Reply</a></td>
                        <td>
                          <form id="deleteContact-{{$contact->id}}" style="display : none" class="" action="{{route('adminDeleteContact', $contact->id)}}" method="post">
                            @csrf
                          </form>
                          <a href="#" class="btn btn-danger" data-toggle="modal" data-target="#deleteContactModal-{{$contact->id}}"><i class="icon icon-trash"></i></a>
                        </td>
                    </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@foreach($contacts as $contact)
<!-- Modal -->
<div class="modal fade" id="deleteContactModal-{{$contact->id}}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="myModalLabel">You are about to delete "{{$contact->message}}".</h4>
      </div>
      <div class="modal-body">
        Are you sure?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">No, Keep it</button>
        <form id="deleteContact-{{$contact->id}}" class="" action="{{route('adminDeleteContact', $contact->id)}}" method="post">
          @csrf
          <button type="submit" class="btn btn-primary">Yes, delete it</button>
        </form>
      </div>
    </div>
  </div>
</div>
@endforeach
@stop
