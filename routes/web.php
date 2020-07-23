<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('admin')->group(function (){
  Route::get('dashboard', 'AdminController@dashboard')->name('adminDashboard');
  Route::get('employees', 'AdminController@employees')->name('adminEmployees');
  Route::get('employee/new', 'AdminController@newEmployee')->name('newEmployee');
  Route::post('employee/new', 'AdminController@createEmployee')->name('createEmployee');
  Route::get('totalbills', 'AdminController@totalbills')->name('adminTotalBills');
  Route::get('bill/{id}/new', 'AdminController@newBill')->name('newBill');
  Route::post('bill/new', 'AdminController@createBill')->name('createBill');
  Route::post('bill/paid', 'AdminController@payBill')->name('payBill');
  Route::post('dailybill', 'AdminController@dailyBill')->name('dailyBill');
  Route::get('ledger', 'AdminController@ledger')->name('adminLedger');
  Route::get('admin/export', 'AdminController@export')->name('adminExport');
  Route::get('admin/ledger_export_view', 'AdminController@ledger_export_view')->name('adminLedgerExport_view');
  Route::get('admin/bill_export_view', 'AdminController@bill_export_view')->name('adminBillExport_view');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
