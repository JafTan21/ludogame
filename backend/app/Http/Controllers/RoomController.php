<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\FuncCall;

class RoomController extends Controller
{
    public function create(Request $request)
    {
        Room::create([
            'room_name' => $request->room_name,
            'entry_fee' => $request->entry_fee
            // 'player_id_1' => $request->player_1,
            // 'player_id_2' => $request->player_2,
            // 'player_id_3' => $request->player_3,
            // 'player_id_4' => $request->player_4,
            // 'status' => 1
        ]);

        return response()->json([
            'status' => 1
        ]);
    }

    public function game_status(Request $request)
    {
        $room = Room::where('room_name', $request->room_name)
            ->latest()
            ->first();

        if (!$room) {
            return response()->json([
                'game_status' => 4 // invalid
            ]);
        }
        return response()->json([
            'game_status' => $room->status
        ]);
    }

    public function join(Request $request)
    {
        $room = Room::where('room_name', $request->room_name)
            ->latest()
            ->first();

        if (!$room) {
            return $this->error('Room not found');
        }

        if (
            $room->player_id_1 == $request->user_id ||
            $room->player_id_2 == $request->user_id ||
            $room->player_id_3 == $request->user_id ||
            $room->player_id_4 == $request->user_id
        ) {
            return $this->success('user already in room');
        }

        if (is_null($room->player_id_1)) {
            $room->update([
                'player_id_1' => $request->user_id
            ]);
            return $this->success('Joined the room');
        }

        if (is_null($room->player_id_2)) {
            $room->update([
                'player_id_2' => $request->user_id
            ]);
            return $this->success('Joined the room');
        }

        if (is_null($room->player_id_3)) {
            $room->update([
                'player_id_3' => $request->user_id
            ]);
            return $this->success('Joined the room');
        }

        if (is_null($room->player_id_4)) {
            $room->update([
                'player_id_4' => $request->user_id
            ]);
            return $this->success('Joined the room');
        }

        return $this->error('Something went wrong...');
    }

    public function leave(Request $request)
    {
        $room = Room::where('room_name', $request->room_name)
            ->latest()
            ->first();

        if (!$room) {
            return $this->error('Room not found');
        }

        if ($room->player_id_1 == $request->user_id) {
            $room->update([
                'player_id_1' => null
            ]);
            return $this->success('Left the room');
        }

        if ($room->player_id_2 == $request->user_id) {
            $room->update([
                'player_id_2' => null
            ]);
            return $this->success('Left the room');
        }

        if ($room->player_id_3 == $request->user_id) {
            $room->update([
                'player_id_3' => null
            ]);
            return $this->success('Left the room');
        }

        if ($room->player_id_4 == $request->user_id) {
            $room->update([
                'player_id_4' => null
            ]);
            return $this->success('Left the room');
        }

        return $this->error('Something went wrong...');
    }

    public function check_user_in_room(Request $request)
    {
        $room = Room::where('room_name', $request->room_name)
            ->latest()
            ->first();

        if (!$room) {
            return $this->error('Room not found');
        }

        if (
            $room->player_id_1 == $request->user_id ||
            $room->player_id_2 == $request->user_id ||
            $room->player_id_3 == $request->user_id ||
            $room->player_id_4 == $request->user_id
        ) {
            return $this->success('user found in the room');
        }

        return $this->error('something went wrong...');
    }

    public function get_room(Request $request)
    {
        $room = Room::where('room_name', $request->room_name)
            ->latest()
            ->first();

        if (!$room) {
            return $this->error('Room not found');
        }

        return response()->json([
            'status' => 1,
            'room' => $room
        ]);
    }
}