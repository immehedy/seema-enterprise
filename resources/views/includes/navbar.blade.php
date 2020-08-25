<!-- Navigation -->
<nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
  <div class="container">
    <a class="navbar-brand" href="/">Seema Enterprise</a>
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
      Menu
      <i class="fas fa-bars"></i>
    </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Offset Printing Machine</a>
          <div class="dropdown-menu" aria-labelledby="dropdown01">
            <a class="dropdown-item" href="{{route('onecolor')}}">One Color</a>
            <a class="dropdown-item" href="{{route('twocolor')}}">Two Color</a>
            <a class="dropdown-item" href="{{route('fourcolor')}}">Four Color</a>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Post Press</a>
          <div class="dropdown-menu" aria-labelledby="dropdown01">
            <a class="dropdown-item" href="{{route('bookbinding')}}">Book Binding</a>
            <a class="dropdown-item" href="{{route('foldingmachine')}}">Folding Machine</a>
            <a class="dropdown-item" href="{{route('diecuttingmachine')}}">Die Cutting Machine</a>
            <a class="dropdown-item" href="{{route('lamination')}}">Lamination Machine</a>
            <a class="dropdown-item" href="{{route('sewingmachine')}}">Sewing Machine</a>
            <a class="dropdown-item" href="{{route('foilmachine')}}">Foil Machine</a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="{{route('guillotine')}}">Guillotine</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/about">About</a>
        </li>
        @if(Auth::check())
        <li class="nav-item">
          <a class="nav-link" href="{{route('adminProducts')}}">Dashboard</a>
        </li>
        <li class="nav-item">
          <form id="logout-form" action="{{route('logout')}}" method="post">@csrf</form>
          <a class="nav-link" href="#" onclick="document.getElementById('logout-form').submit();">Logout</a>
        </li>
        @else
        <li class="nav-item">
          <a class="nav-link" href="{{route('login')}}">Login</a>
        </li>
        <!-- <li class="nav-item">
          <a class="nav-link" href="{{route('register')}}">Register</a>
        </li> -->
        @endif
      </ul>
    </div>
  </div>
</nav>
