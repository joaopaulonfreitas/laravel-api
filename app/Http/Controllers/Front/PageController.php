<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class PageController extends Controller
{

    public function home()
    {
        $products = Product::all();

        return view('pages.home.index', compact('products'));
    }

    public function vue()
    {
        $products = Product::all();

        return view('template.app', compact('products'));
    }
}
