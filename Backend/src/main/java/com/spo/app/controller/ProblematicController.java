package com.spo.app.controller;
import com.spo.app.dao.ProblematicRepo;
import com.spo.app.entity.Problematic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/problematics")
public class ProblematicController {

    @Autowired
    private ProblematicRepo problematicRepository;

    // Get all problematics
    @GetMapping
    public ResponseEntity<List<Problematic>> getAllProblematics() {
        List<Problematic> problematics = problematicRepository.findAll();
        return new ResponseEntity<>(problematics, HttpStatus.OK);
    }

    // Create a new problematic
    @PostMapping("/add")
    public ResponseEntity<Problematic> createProblematic(@RequestBody Problematic problematic) {
        Problematic savedProblematic = problematicRepository.save(problematic);
        return new ResponseEntity<>(savedProblematic, HttpStatus.CREATED);
    }

    // Get problematic by ID
    @GetMapping("/getbyid/{id}")
    public ResponseEntity<Problematic> getProblematicById(@PathVariable String id) {
        Problematic problematic = problematicRepository.findById(id).orElse(null);
        if (problematic != null) {
            return new ResponseEntity<>(problematic, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update problematic
    @PutMapping("/update/{id}")
    public ResponseEntity<Problematic> updateProblematic(@PathVariable String id, @RequestBody Problematic updatedProblematic) {
        Problematic problematic = problematicRepository.findById(id).orElse(null);
        if (problematic != null) {
            updatedProblematic.setId(id); // Ensure ID is set for update
            Problematic savedProblematic = problematicRepository.save(updatedProblematic);
            return new ResponseEntity<>(savedProblematic, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete problematic by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProblematic(@PathVariable String id) {
        Problematic problematic = problematicRepository.findById(id).orElse(null);
        if (problematic != null) {
            problematicRepository.delete(problematic);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
