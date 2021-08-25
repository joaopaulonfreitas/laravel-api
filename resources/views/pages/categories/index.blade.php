@extends('template.pages')

@section('content')

<!-- Header-->
<header class="bg-dark py-5">
    <div class="container px-4 px-lg-5 my-5">
        <div class="text-center text-white">
            <h1 class="display-4 fw-bolder">New Category</h1>
            <p class="lead fw-normal text-white-50 mb-0">Add new categories</p>
        </div>
    </div>
</header>

<section class="py-5">
    <div class="container px-4 px-lg-5 mt-5">

        <categories-create />

    </div>
</section>
@endsection
