<!DOCTYPE html>
<html lang="en">
<head>
  <title>Seema Enterprise</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
  @yield('styles')
</head>
<body>

<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
  <!-- Brand -->
  <a class="navbar-brand" href="#">seema Enterprise</a>

  <!-- Links -->
  <ul class="navbar-nav">
    <li class="nav-item">
      <a class="nav-link" href="#">Home</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Admin</a>
    </li>

    <!-- Dropdown -->
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
        Employees
      </a>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="{{route('employees.index')}}">All Employees</a>
        <a class="dropdown-item" href="{{route('employees.create')}}">Add Employees</a>
      </div>
    </li>

    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
        Posts
      </a>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#">All Posts</a>
        <a class="dropdown-item" href="#">Create Posts</a>
      </div>
    </li>

    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
        Media
      </a>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#">Media List</a>
        <a class="dropdown-item" href="#">Upload</a>
      </div>
    </li>

    <li class="nav-item">
      <a class="nav-link" href="#">Categories</a>
    </li>

    <li class="nav-item">
      <a class="nav-link" href="#">Comments</a>
    </li>

  </ul>
</nav>
<br>
<div class="container">
  @yield('content')
</div>
@yield('scripts')
</body>
</html>
