package com.spo.app.controller;

import com.spo.app.entity.WhatTuto;
import com.spo.app.entity.WhyTuto;
import com.spo.app.services.WhytutoServiceImpl;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;

@Tag(name = "Web Services pour whytuto ")
@CrossOrigin(origins = "*")
@AllArgsConstructor
@RequestMapping("/whytuto")
@RestController
public class WhytutoController {

    WhytutoServiceImpl whytutoService;

    @PostMapping("/add_whytuto")
    public WhyTuto addWhyTuto(@RequestBody WhyTuto whyTuto) {

        return whytutoService.addWhyTuto(whyTuto);
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
