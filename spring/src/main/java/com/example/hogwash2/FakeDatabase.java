package com.example.hogwash2;

import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
class FakeDatabase {
    private Map<String, Hog> database = new HashMap<>();

    void save(Hog hog) {
        database.put(hog.getId(), hog);
    }

    void delete(String id) {
        database.remove(id);
    }

    Hog find(String id) {
        return database.get(id);
    }
}
