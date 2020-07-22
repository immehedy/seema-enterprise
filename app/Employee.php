<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    //
    protected $fillable = [
      'name',
      'phone',
      'address',

    ];

    public function bills(){
      return $this->hasMany('App\EmployeeBill');
    }
    public function ledger(){
      return $this->hasMany('App\Ledger');
    }
}
