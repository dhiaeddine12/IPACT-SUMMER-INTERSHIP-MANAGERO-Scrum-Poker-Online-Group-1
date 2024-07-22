package com.spo.app.controller;

import com.spo.app.entity.Creategame;
import com.spo.app.services.CreateGameServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@Tag(name = "Web Services pour la createGame ")
@CrossOrigin(origins = "*")
@AllArgsConstructor
@RequestMapping("/creategame")
@RestController
public class CreateGameController {

CreateGameServiceImpl createGameService;

    @PostMapping("/add_creategame")
    public Creategame addCreategame (@RequestBody Creategame creategame) {
        return createGameService.addCreategame(creategame);
    }

    @PutMapping("/modify-creategame")
    public Creategame updateCreategame(@RequestBody Creategame creategame) {
        return createGameService.updateCreategame(creategame);
    }

    @DeleteMapping("/remove-creategame/{creategame-id}")
    public void deleteCreategame(@PathVariable("creategame-id")
                                     String  CreategameId) {
        createGameService.deleteCreategame(CreategameId);
    }

    @Operation(description = "Return an creategame!")
    @GetMapping("/retrieve-creategame/{creategame-id}")
    public Creategame getCreategame(@PathVariable("admin-id") String  CreategameId) {
        return createGameService.retrieveCreategame(CreategameId);
    }

    @GetMapping("/retrieve-all-creategames")
    public List<Creategame> getCreategames() {
        return createGameService.retrieveAllCreategames();
    }

}
