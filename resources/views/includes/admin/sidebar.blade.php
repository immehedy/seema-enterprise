<div class="sidebar">
    <nav class="sidebar-nav">
        <ul class="nav">
            <li class="nav-title">Admin</li>

            <li class="nav-item">

                <a href="{{route('adminDashboard')}}" class="nav-link " {{Route::currentRouteName() == 'adminDashboard' ? 'active' : ''}}>
                    <i class="icon icon-speedometer"></i> Dashboard
                </a>
            </li>

            <li class="nav-item nav-dropdown">
                <a href="{{route('adminEmployees')}}" class="nav-link" {{Route::currentRouteName() == 'adminEmployees' ? 'active' : ''}}>
                    <i class="icon icon-user"></i> Employees
                </a>
            </li>
            <li class="nav-item nav-dropdown">
                <a href="{{route('adminTotalBills')}}" class="nav-link" {{Route::currentRouteName() == 'adminTotalBills' ? 'active' : ''}}>
                    <i class="icon icon-paper-clip"></i> Bills
                </a>
            </li>
            <li class="nav-item nav-dropdown">
                <a href="{{route('adminLedger')}}" class="nav-link" {{Route::currentRouteName() == 'adminLedger' ? 'active' : ''}}>
                    <i class="icon icon-book-open"></i> Ledger
                </a>
            </li>
            <li class="nav-item nav-dropdown">
                <a href="{{route('adminProducts')}}" class="nav-link" {{Route::currentRouteName() == 'adminProducts' ? 'active' : ''}}>
                    <i class="icon icon-basket-loaded"></i> Products
                </a>
            </li>
        </ul>
    </nav>
</div>
