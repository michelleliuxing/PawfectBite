package com.pawfectbite.server.calendar.application;

import com.pawfectbite.server.calendar.domain.CalendarEntry;
import com.pawfectbite.server.calendar.dto.CreateCalendarEntryRequest;
import com.pawfectbite.server.calendar.dto.UpdateCalendarEntryRequest;
import com.pawfectbite.server.calendar.repository.CalendarEntryRepository;
import com.pawfectbite.server.common.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.UUID;

@Service
public class CalendarService {

    private final CalendarEntryRepository repository;

    public CalendarService(CalendarEntryRepository repository) {
        this.repository = repository;
    }

    public List<CalendarEntry> getEntries(UUID userId, UUID petId, String month) {
        YearMonth ym = YearMonth.parse(month);
        LocalDate start = ym.atDay(1);
        LocalDate end = ym.atEndOfMonth();
        return repository.findByUserPetAndMonth(userId, petId, start, end);
    }

    @Transactional
    public CalendarEntry createEntry(UUID userId, CreateCalendarEntryRequest request) {
        return repository.save(userId, request.petId(), request.recipeId(), request.date(), request.mealType());
    }

    @Transactional
    public CalendarEntry updateEntry(UUID entryId, UpdateCalendarEntryRequest request) {
        return repository.update(entryId, request.recipeId(), request.date(), request.mealType());
    }

    public CalendarEntry getEntryById(UUID entryId) {
        return repository.findById(entryId)
                .orElseThrow(() -> new ResourceNotFoundException("CalendarEntry", entryId));
    }

    @Transactional
    public void deleteEntry(UUID entryId) {
        repository.delete(entryId);
    }
}
