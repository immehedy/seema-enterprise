<?php

namespace App\Exports;

use App\Ledger;
use App\EmployeeBill;
use App\Employee;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Illuminate\Support\Facades\Route;

class LedgerExportView implements FromView
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function view():View
    {
        $date = date("Y/m/d");
        $ledgers = Ledger::whereDate('date', $date)->pluck('id')->toArray();

        if(Route::currentRouteName() == 'adminLedgerExport_view'){
          return view('table.ledgertable',[
            'dailyledgers' => Ledger::whereIn('id', $ledgers)->get()
          ]);
        }
        else if(Route::currentRouteName() == 'adminBillExport_view'){
          return view('table.totalbilltable',[
            'totalbills' => EmployeeBill::all()
          ]);
        }

    }
}
