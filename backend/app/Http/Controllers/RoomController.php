<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{


    public function create(Request $request)
    {
        Room::create([
            'room_name' => $request->room_name,
            'player_id_1' => $request->player_1,
            'player_id_2' => $request->player_2,
            'player_id_3' => $request->player_3,
            'player_id_4' => $request->player_4,
            'status' => 1
        ]);

        return response()->json([
            'status' => 1
        ]);
    }

    public function game_status(Request $request)
    {
        $room = Room::where('room_name', $request->room_name)->latest()->first();
        if (!$room) {
            return response()->json([
                'game_status' => 4 // invalid
            ]);
        }
        return response()->json([
            'game_status' => $room->status
        ]);
    }
}