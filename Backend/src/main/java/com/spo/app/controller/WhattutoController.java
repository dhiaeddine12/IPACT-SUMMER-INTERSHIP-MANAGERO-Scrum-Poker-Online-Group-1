package com.spo.app.controller;

import com.spo.app.entity.WhatTuto;
import com.spo.app.services.WhattutoServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.time.LocalDateTime;
import java.util.List;

@Tag(name = "Web Services pour whattuto ")
@CrossOrigin(origins = "*")
@AllArgsConstructor
@RequestMapping("/whattuto")
@RestController
public class WhattutoController {
WhattutoServiceImpl whattutoService;

    @PostMapping("/add_whattuto")
    public WhatTuto addWhatTuto(@RequestBody WhatTuto whatTuto) {

        return whattutoService.addWhatTuto(whatTuto);
    }

    @PutMapping("/modify-whattuto")
    public WhatTuto updateWhatTuto(@RequestBody WhatTuto whatTuto) {
        return whattutoService.updateWhatTuto(whatTuto);
    }

    @GetMapping("/retrieve-all-whattutos")
    public List<WhatTuto> getWhatTutos() {
        return whattutoService.retrieveAllWhatTuto();
    }

}
