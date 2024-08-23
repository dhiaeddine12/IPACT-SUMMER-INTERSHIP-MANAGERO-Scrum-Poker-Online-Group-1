package com.spo.app.controller;

import com.spo.app.dao.WhatifRepo;
import com.spo.app.entity.Project;
import com.spo.app.entity.Whatif;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/whatif")
@CrossOrigin(origins = "http://localhost:4200")
public class WhatifController {

    @Autowired
    private WhatifRepo whatifRepo;

    // Get all Whatif entries
    @GetMapping
    public ResponseEntity<List<Whatif>> getAllWhatifs() {
        List<Whatif> whatifs = whatifRepo.findAll();
        return new ResponseEntity<>(whatifs, HttpStatus.OK);
    }

    // Get a single Whatif by ID
    @GetMapping("/{id}")
    public ResponseEntity<Whatif> getWhatifById(@PathVariable String id) {
        Optional<Whatif> whatif = whatifRepo.findById(id);
        return whatif.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Create a new Whatif entry
    @PostMapping
    public ResponseEntity<Whatif> createWhatif(@RequestBody Whatif whatif) {
        Whatif createdWhatif = whatifRepo.save(whatif);
        return new ResponseEntity<>(createdWhatif, HttpStatus.CREATED);
    }

    // Update the description of a Whatif entry
    @PutMapping("/updatewhatif/{id}")
    public ResponseEntity<Whatif> updateWhatifDescription(@PathVariable String id, @RequestBody Whatif updatedWhatifData) {
        Optional<Whatif> whatifData = whatifRepo.findById(id);
        if (whatifData.isPresent()) {
            Whatif whatif = whatifData.get();
            whatif.setTitle(updatedWhatifData.getTitle()); // Update title if needed
            whatif.setDescription(updatedWhatifData.getDescription()); // Update description
            Whatif updatedWhatif = whatifRepo.save(whatif);
            return new ResponseEntity<>(updatedWhatif, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    // Delete a Whatif entry
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteWhatif(@PathVariable String id) {
        try {
            whatifRepo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}