package com.babulens.weighbridge.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class Settings {
    @Id
    private String key;
    private String value;

    public Settings() {
    }

    public Settings(String key, Object value) {
        this.key = key;
        this.value = value.toString();
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value.toString();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Settings settings = (Settings) o;
        return Objects.equals(key, settings.key);
    }

    @Override
    public int hashCode() {
        return Objects.hash(key);
    }

    @Override
    public String toString() {
        return "Settings{" +
                "key='" + key + '\'' +
                ", value=" + value +
                '}';
    }
}
