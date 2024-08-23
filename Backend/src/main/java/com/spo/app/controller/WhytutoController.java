package com.spo.app.controller;

import com.spo.app.entity.WhatTuto;
import com.spo.app.entity.WhyTuto;
import com.spo.app.services.WhytutoServiceImpl;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;

@Tag(name = "Web Services pour whytuto ")
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
@RequestMapping("/whytuto")
@RestController
public class WhytutoController {

    WhytutoServiceImpl whytutoService;

    @PostMapping("/add_whytuto")
    public ResponseEntity<WhyTuto> addWhyTuto(@RequestBody WhyTuto whyTuto) {
        WhyTuto savedWhyTuto = whytutoService.addWhyTuto(whyTuto);
        return new ResponseEntity<>(savedWhyTuto, HttpStatus.CREATED);
    }

    @PutMapping("/modify-whytuto")
    public WhyTuto updateWhyTuto(@RequestBody WhyTuto whyTuto) {
        return whytutoService.updateWhyTuto(whyTuto);
    }

    @GetMapping("/retrieve-all-whytutos")
    public List<WhyTuto> getWhyTutos() {
        return whytutoService.retrieveAllWhyTuto();
    }

    @DeleteMapping("/remove-whytutos/{whytutos-id}")
    public void deleteForum(@PathVariable("whytutos-id")
                            String  whytutosId) {
        whytutoService.deleteWhyTuto(whytutosId);
    }

}
