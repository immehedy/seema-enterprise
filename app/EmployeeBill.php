<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EmployeeBill extends Model
{
    //
    protected $fillable=[
      'description',
      'amount',
      'employee_id',
    ];

    public function employee(){
      return $this->belongsTo('App\Employee');
    }
    public function ledger(){
      return $this->hasMany('App\Ledger');
    }
}
