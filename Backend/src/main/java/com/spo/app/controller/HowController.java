package com.spo.app.controller;

import com.spo.app.dao.HowRepo;
import com.spo.app.entity.How;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/how")
@CrossOrigin(origins = "http://localhost:4200")
public class HowController {

    @Autowired
    private HowRepo howRepo;


    // Get all How entries
    @GetMapping
    public ResponseEntity<List<How>> getAllHows() {
        List<How> hows = howRepo.findAll();
        return new ResponseEntity<>(hows, HttpStatus.OK);
    }

    // Get a single How by ID
    @GetMapping("/{id}")
    public ResponseEntity<How> getHowById(@PathVariable String id) {
        Optional<How> how = howRepo.findById(id);
        return how.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Create a new How entry
    @PostMapping
    public ResponseEntity<How> createHow(@RequestBody How how) {
        How createdHow = howRepo.save(how);
        return new ResponseEntity<>(createdHow, HttpStatus.CREATED);
    }

    // Update the title of a How entry
    @PutMapping("/{id}/title")
    public ResponseEntity<How> updateHowTitle(@PathVariable String id, @RequestBody String newTitle) {
        Optional<How> howData = howRepo.findById(id);
        if (howData.isPresent()) {
            How how = howData.get();
            how.setTitle(newTitle);
            How updatedHow = howRepo.save(how);
            return new ResponseEntity<>(updatedHow, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update steps of a How entry
    @PutMapping("/{id}")
    public ResponseEntity<How> updateHow(@PathVariable String id, @RequestBody How updatedHowData) {
        Optional<How> howData = howRepo.findById(id);
        if (howData.isPresent()) {
            How how = howData.get();
            how.setTitle(updatedHowData.getTitle());
            how.setDescription(updatedHowData.getDescription());
            How updatedHow = howRepo.save(how);
            return new ResponseEntity<>(updatedHow, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a How entry
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteHow(@PathVariable String id) {
        try {
            howRepo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

