<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function success($msg, $user = null)
    {
        $res = [
            'status' => 1,
            'msg' => $msg
        ];
        if ($user) {
            $res['user'] = $user;
        }
        return response()->json($res);
    }

    public function error($msg)
    {
        return response()->json(
            [
                'status' => 0,
                'msg' => $msg,
            ]
        );
    }
}