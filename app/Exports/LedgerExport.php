<?php

namespace App\Exports;

use App\Ledger;
use Maatwebsite\Excel\Concerns\FromCollection;

class LedgerExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Ledger::all();
    }
}
