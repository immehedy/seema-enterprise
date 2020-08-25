<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class Product extends Model
{
    public function photos(){
      return $this->hasMany('App\Photo');
    }
}
