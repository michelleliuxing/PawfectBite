package com.pawfectbite.server.calendar.controller;

import com.pawfectbite.server.calendar.application.CalendarService;
import com.pawfectbite.server.calendar.domain.CalendarEntry;
import com.pawfectbite.server.calendar.dto.*;
import com.pawfectbite.server.common.response.ApiResponse;
import com.pawfectbite.server.infrastructure.security.AuthenticatedUser;
import com.pawfectbite.server.infrastructure.security.OwnershipEnforcer;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/calendar")
public class CalendarController {

    private final CalendarService calendarService;
    private final OwnershipEnforcer ownershipEnforcer;

    public CalendarController(CalendarService calendarService, OwnershipEnforcer ownershipEnforcer) {
        this.calendarService = calendarService;
        this.ownershipEnforcer = ownershipEnforcer;
    }

    @GetMapping
    public ApiResponse<List<CalendarEntryResponse>> getEntries(
            @RequestParam UUID petId,
            @RequestParam String month,
            @AuthenticationPrincipal AuthenticatedUser principal
    ) {
        List<CalendarEntryResponse> entries = calendarService
                .getEntries(principal.userId(), petId, month)
                .stream().map(CalendarEntryResponse::from).toList();
        return ApiResponse.ok(entries);
    }

    @PostMapping("/entries")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<CalendarEntryResponse> createEntry(
            @Valid @RequestBody CreateCalendarEntryRequest request,
            @AuthenticationPrincipal AuthenticatedUser principal
    ) {
        CalendarEntry entry = calendarService.createEntry(principal.userId(), request);
        return ApiResponse.ok(CalendarEntryResponse.from(entry));
    }

    @PutMapping("/entries/{entryId}")
    public ApiResponse<CalendarEntryResponse> updateEntry(
            @PathVariable UUID entryId,
            @Valid @RequestBody UpdateCalendarEntryRequest request,
            @AuthenticationPrincipal AuthenticatedUser principal
    ) {
        CalendarEntry existing = calendarService.getEntryById(entryId);
        ownershipEnforcer.enforce(existing.userId());
        CalendarEntry updated = calendarService.updateEntry(entryId, request);
        return ApiResponse.ok(CalendarEntryResponse.from(updated));
    }

    @DeleteMapping("/entries/{entryId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEntry(
            @PathVariable UUID entryId,
            @AuthenticationPrincipal AuthenticatedUser principal
    ) {
        CalendarEntry entry = calendarService.getEntryById(entryId);
        ownershipEnforcer.enforce(entry.userId());
        calendarService.deleteEntry(entryId);
    }
}
