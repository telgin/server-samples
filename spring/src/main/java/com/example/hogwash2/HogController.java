package com.example.hogwash2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriBuilder;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.UUID;

@Controller
@RequestMapping("/hogs")
public class HogController {

    @Autowired
    private FakeDatabase fakeDatabase;

    @PostMapping()
    public ResponseEntity<String> createHog(@RequestBody Hog hog) {
        System.out.println("POST");
        String uuid = UUID.randomUUID().toString();

        hog.setId(uuid);

        fakeDatabase.save(hog);

        URI location = UriComponentsBuilder.fromHttpUrl("http://localhost:8080/hogs/{id}")
                .buildAndExpand(uuid)
                .toUri();

        return ResponseEntity.created(location)
                .build();
    }

    @GetMapping("/{id}")
    public ResponseEntity getHog(@PathVariable String id) {
        System.out.println("GET " + id);
        Hog hog = fakeDatabase.find(id);

        if (hog == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);

        }

        return ResponseEntity.ok(hog);
    }

    @PutMapping("/{id}")
    public ResponseEntity editHog(@PathVariable String id, @RequestBody Hog hog) {
        hog.setId(id);
        fakeDatabase.save(hog);

        return ResponseEntity.ok()
                .build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteHog(@PathVariable String id) {
        fakeDatabase.delete(id);

        return ResponseEntity.ok()
                .build();
    }
}
