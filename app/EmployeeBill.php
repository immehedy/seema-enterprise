<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EmployeeBill extends Model
{
    //
    protected $fillable=[
      'description',
      'debit',
      'credit',
    ];

    public function employee(){
      return $this->belongsTo('App\Employee');
    }
}
